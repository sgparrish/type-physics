import ScreenManager from "./engine/screenmanager";
import LoadScreen from "./loadscreen";
import Context from "./graphics/context";

function main() {
   Context.initialize();
   let game: ScreenManager = new ScreenManager(new LoadScreen());
}
main();