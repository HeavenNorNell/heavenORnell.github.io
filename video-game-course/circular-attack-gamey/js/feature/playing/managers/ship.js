(function (window, opspark, _) {
  // create a namespace for the ship manager //
  _.set(
    opspark,
    "playa.ship",
    /**
     * Creates and returns the ship manager.
     */
    function (assets, controls, messenger, projectile, emitter, level, keyMap) {
      // default key map //
      keyMap = keyMap || {
        UP: controls.KEYS.UP,
        LEFT: controls.KEYS.LEFT,
        RIGHT: controls.KEYS.RIGHT,
        PASS: controls.KEYS.ENTER,
      };
      let ship, fire;
      // turn is a variable that can have a value of 1 or 2. Based on its value, one or the other player's controls will be locked. Turn changes whenever a player runs out of movement
      window.turn = 1;
      window.turnNumber = 0;
      setRateOfFire(5);

      function explode() {
        let i, id;

        ship.alpha = 0;

        // show the player explosion for a short period of time //
        i = 0;
        id = setInterval(function () {
          ship.explosion.emit({ x: ship.x, y: ship.y });
          if (i > 60) {
            window.clearInterval(id);
            ship.explosion.stop();
            emitter.destroy();
            messenger.dispatch({
              type: "DESPAWN",
              bodies: [ship],
              source: "ship",
            });
          }
          i++;
        }, 17);
      }

      function setRateOfFire(value) {
        fire = _.throttle((player) => projectile.fire(player), value, {
          trailing: false,
        });
      }

      function handleCollisionShip(impact) {
        if (this.integrity > 0) {
          this.integrity -= impact;
          if (this.integrity <= 0) {
            // explode();
            window.winner = "Red"
            messenger.dispatch({ type: 'EXPLOSION', source: 'ship', target: this });
          }
        }
      }

      // return the ship manager api //
      return {
        spawn(ide, color = "#26e9f0") {
          if (ship) throw new Error("Player is already spawned!");
          // only one ship is managed by the module //
          ship = assets.makeShip(color);
          ship.handleCollision = handleCollisionShip;
          ship.id = ide;
          ship.movement = 1;
          messenger.dispatch({ type: "SPAWN", bodies: [ship], source: "ship" });
          return this;
        },
        setRateOfFire,
        setKeyMap(map) {
          keyMap = map;
          return this;
        },
        update(event) {
          // left and right arrows cannot be pressed at the same time //
          // lock players from moving if it's not their turn

          if (turn === ship.id) {
            if (controls.isActive(keyMap.LEFT)) {
              ship.rotationalVelocity = -5;
            } else if (controls.isActive(keyMap.RIGHT)) {
              ship.rotationalVelocity = 5;
            } else {
              ship.rotationalVelocity = 0;
            }
              console.log(window.turnNumber)
            // up arrow can be pressed in combo with other keys //
            if (window.turnNumber > 5){
              messenger.dispatch({ type: 'EXPLOSION', source: 'ship', target: this });
            }
            if (ship.movement < 0) {
              window.turn *= -1;
              emitter.stop();
              ship.propulsion = 0;
              ship.movement = 1;
              ship.rotationalVelocity = 0;
              window.turnNumber += 0.5;
              messenger.dispatch({
                type: "DAMAGE",
                source: "ship",
                target: this,
              });
            } else {
              if (controls.isActive(keyMap.UP)) {
                emitter.emit(ship.getExhaustPoint());
                ship.propulsion = 0.1;
                ship.movement -= 0.003;
                messenger.dispatch({
                  type: "DAMAGE",
                  source: "ship",
                  target: this,
                });
              } else {
                emitter.stop();
                ship.propulsion = 0;
              }
            }

            /*
             * Space key can be pressed in combo with other keys.
             * Throttle the rateOfFire using _.throttle based on
             * level.rateOfFire.
             */
            if (controls.isActive(keyMap.FIRE)) {
              fire(ship);
            }
          }
        },
      };
    }
  );
})(window, window.opspark, window._);
