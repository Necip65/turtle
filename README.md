## 3D Turtle Graphics
Made by necips@live.de, March 2022, babylon.js

![Snapshot](https://necip65.github.io/logo/logo.jpg)

I have revisited the topic of logo programming and now you can operate in 3D spaces with simple commands. 
You just have to be able to think geometrically here. Imagine you are sitting on a turtle and just command it around.
Since you don’t have to work with just one Turtle, but can coordinate a whole army, the idea was to knit surfaces while the Turtles advance on their own paths.

mesh1 is the turtle you are moving. mesh2 is the last position and the last rotation of your mesh1 turtle. It is always good to know what the status was before to come back to it.

There are only a handful of commands, which I shortened to two letters to be able to write faster.

- la: look at (turtle)
- lt: turn left (alpha, beta)
- rt: turn right (alpha, beta)
- fw: forward (length)
- bw: backward (length)

For the turns it is necessary to take into account that two angles (0-360) must be entered: alpha, an angle between xy and beta, an angle between xz

have fun!


live demo: https://necip65.github.io/turtle/


### Alternative method
Made by necips@live.de, July 2019, babylon.js

https://playground.babylonjs.com/#55S77X

- ro: rotate
- fw: forward
- cl: clone a mesh to current position and rotation
