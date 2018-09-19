# Whac-a-Mole!

Parcel is used to bundle the application. Steps to run the application:

```
npm install
npm start
```

## Code Standards
* ES6 classes
* SCSS
* HTML

## Architecture
```
App (Bootstrapper)
| -- GameManger (Time, Score, Event Listeners)
     | -- Game (Controls the moles)
          | -- Moles (Fires events when whacked/missed)
``` 
At the top level is an App component. It's only job is to bootstrap the application. Below that is a GameManager. It's role is the manage time, score, sending actions to the game and receiving events/actions from the game. The game is next, it has the role of managing moles, how long and which ones will popup. The moles handle the interactions and know when they are "whacked" or "missed". Those events are bubbled up the hierachy to the GameManager level.

## Places to improve
  * Better state management
    * The first thing to improve upon would be better state management. Currently every class has some internal state, there are no stateless components.
    * I would start with the `moles` these could easily be changed to stateless components. They should ultimately be able to be rerender based on the state coming in.
    * The `game` could also be changed. While there are quite a bit of actions coming in and out of the game, most of that is in dealing with the `moles`. I would suggest moving the state even higher up to the `gameManager` and allow the state to dictate which `moles` are active or not.
  * Less OOP
    * Almost all of the objects are self contained. They cannot be cached/memoized and do not take in any parameters. This is due to the fact that most of the objects initialize and manage their own state. By moving the state up higher and changing the rendering more stateless functions could be created.
  * Better rendering
    * Most of the classes are scanning the DOM for certain classes/ids, I would change this to use a better binding system, so that changes to state could affect rendering in a simpler less jQueryesque way.
  * Tests!
    * Normally I do write unit tests or at least e2e tests. TDD is what I do, but normally it's "Test **During** Development" (haha).

At the end of the day there is a lot of poor man's data binding. When state is changed the dom changes. Actions are just dom events and they are bubbled up. The design was an afterthought, I used a simple svg I found online for the mole. I feel pretty good about the state of this game, I know it could be improved, but it works.

### Game Objective: 
Click a “mole” as it appears. The amount of time each mole stays visible should be random. The game should have a time limit. There should be controls available to start, stop, and reset the game. 

### Requirements:
The game should function consistently in IE11+ and one other major browser
The game should function consistently in at least 2 unique viewport sizes. 
