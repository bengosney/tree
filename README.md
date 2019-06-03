# Procedurally Generated Trees

## Live Demo

[https://bengosney.github.io/tree/](https://bengosney.github.io/tree/)


## Details

The tree limbs are generated using a simple algorithm.
Each limb is half the length of the previous limb with a random variance applied. They also have OpenSimplexNoise applied to it to give it a more natural look.
The number of limbs at each point is determined by a random number, the limbs are then evenly spread and then have even more noise applied to the angle.

Once the iteration limit is reached a flower is drawn. The flowers are much more detailed than can actually be seen.
Each flower has 5 petals consisting of a triangle with a smooth bezier curve on the outer edge. Each petal is coloured with light pink gradient and a slight drop shadow, giving it a paper look.

## Why?

Why not?
