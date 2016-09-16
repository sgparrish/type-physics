import PhysicsScreen from "./physicsScreen";

export default function main() {
   console.debug("main");
   let game: PhysicsScreen = new PhysicsScreen();
   game.start(60);
}
main();