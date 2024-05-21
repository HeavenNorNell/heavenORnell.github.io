(function (window, createjs, opspark, _) {
  const draw = opspark.draw,
    layout = opspark.factory.component.layout;

  // create a namespace for the hud //
  _.set(opspark, "playa.hud", function (game, messenger) {
    const canvas = game.canvas;

    const huds = layout({ direction: "VERTICAL", padding: 4 });
    game.hud.addChild(huds);
    let active = [];

    function activate() {
      messenger.on("SPAWN", onSpawn);
      return this;
    }

    function deactivate() {
      messenger.off("SPAWN", onSpawn);
      return this;
    }

    function destroy() {
      deactivate();
      game.hud.removeChild(huds);
      active = null;
    }

    function onSpawn(event) {
      switch (event.source) {
        case "ship":
          const hud = makeHud(_.first(_.get(event, "bodies")));
          active.push(hud);
          huds.add(hud);
          break;
        default:
        // code
      }
    }

    function makeHud(ship) {
      const hud = new createjs.Container();

      const txtScore = draw.textfield(
          "Movement:",
          "19px Arial",
          "#26e9f0",
          "left"
        ),
        integrity = new createjs.Container(),
        background = draw.rect(104, 20, "#242424"),
        integrityMeter = draw.rect(100, 16, ship.color || "#3333CC");

      draw.rect(102, 18, "#242424", null, null, 1, 1, background);

      // add all view components to their containers in the correct order //
      integrity.addChild(background, integrityMeter);
      hud.addChild(txtScore, integrity);

      /**
       * Called when the asset is added to the stage.
       * Use render() to config and position components.
       */
      function render() {
        integrityMeter.x = integrityMeter.y = 2;
        integrity.x = txtScore.getBounds().width + 4;

        hud.x = canvas.width - hud.getBounds().width - 2;
      }

      // setup a one-time added-to-parent listener //
      hud.on("added", onAdded);

      function onAdded(event) {
        if (game.getDebug()) console.log("hud added to stage");
        hud.off("added", onAdded);
        render();
      }

      hud.setValue = function (value) {
        if (value > -1 && value < 101) {
          createjs.Tween.get(integrityMeter).to({ scaleX: value }, 400);
          if (value === 0) hud.kill();
        }
      };

      hud.kill = function () {
        createjs.Tween.get(integrityMeter).to({ alpha: 0 }, 1000);
      };

      messenger.on("DAMAGE", onDamage);
      function onDamage(event) {
          hud.setValue(ship.movement);
      }

      return hud;
    }

    return {
      // called on screen resize //
      liquify() {
        return createjs.Tween.get(huds, { loop: false }).to(
          { x: canvas.width - huds.getBounds().width - 2 },
          700,
          createjs.Ease.getPowInOut(4)
        );
      },
      activate,
      deactivate,
      destroy,
    };
  });
})(window, window.createjs, window.opspark, window._);
