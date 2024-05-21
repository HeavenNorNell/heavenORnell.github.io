(function (window, opspark, _) {
  const createjs = window.createjs,
    draw = opspark.draw,
    phyz = opspark.racket.physikz;

  // create a namespace for the projectile manager //
  _.set(
    opspark,
    "playa.projectile",
    /**
     * Creates and returns the projectile manager.
     */
    function (fx, assets, messenger) {
      const objects = [],
        pool = {
          objects: objects,

          get: function () {
            if (objects.length > 0) {
              return objects.pop();
            }
            return makeObject();
          },

          recycle: function (object) {
            messenger.dispatch({ type: "POOL", bodies: [object] });

            object.x = -object.width;
            object.alpha = 1;
            object.scaleX = object.scaleY = -1;
            objects.push(object);
          },
        };

      function makeObject() {
        return assets.makeProjectile();
        projectile.handleCollision = handleCollision;
      }

      // function handleCollisionProjectile(impact) {
      //   // TODO : Consider if particles are necessary here //
      // particleManager.makeEmitter(1, 2, '#FF0000').emit({x: projectile.x, y: projectile.y}, 0.5);
      // }

      function handleCollision(impact, body) {
        // don't handle collisions between orbs //
        if (body.type === this.type) return;

        /*
         * Because the explosion is async, the orb may exist
         * but have already exploded, so check first to see
         * if it has integrity before running check to exlode.
         */
        // if (this.integrity > 0) {
        //   console.log(impact);
        //   this.integrity -= impact * 100;
        //   if (this.integrity <= 0) {
        fx.makeEmitter(2, 3, "#f52547", null, [
          new Proton.RandomDrift(5, 0, 0.35),
        ]).emit({ x: this.x, y: this.y }, 0.5);
        pool.recycle(this);
        messenger.dispatch({
          type: "EXPLOSION",
          source: "projectile",
          target: this,
          incoming: body,
        });
        // }
      }

      function onTweenComplete(e) {
        pool.recycle(e.target);
      }

      // return the projectile manager api //
      return {
        fire: function (emitter) {
          var projectile, degrees;

          projectile = pool.get();
          projectile.rotation = emitter.rotation;

          //console.log(projectile.rotation);

          degrees = emitter.rotation;
          projectile.velocityX =
            Math.cos(phyz.degreesToRadians(degrees)) *
            (projectile.velocityMax + emitter.velocityX);
          projectile.velocityY =
            Math.sin(phyz.degreesToRadians(degrees)) *
            (projectile.velocityMax + emitter.velocityY);
          projectile.rotationalVelocity = 0;

          //console.log(projectile.velocityX);
          //console.log(projectile.velocityY);

          var projectilePoint = emitter.getProjectilePoint();
          //projectile.activate();
          projectile.x = projectilePoint.x;
          projectile.y = projectilePoint.y;

          // keep a reference on the projectile to who shot the projectile //
          projectile.emitter = emitter;

          createjs.Tween.get(projectile, { override: true })
            .wait(500)
            .to(
              { alpha: 0, scaleX: 0.1, scaleY: 0.1 },
              1000,
              createjs.Ease.linear
            )
            .call(onTweenComplete);

          messenger.dispatch({ type: "SPAWN", bodies: [projectile] });
        },
      };
    }
  );
})(window, window.opspark, window._);
