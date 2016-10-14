import Direction from "../physics/direction";

export default class DirectionUtil {
   public static directionToString(direction: Direction): string {
      let dirString: string;
      switch (direction) {
         case Direction.LEFT:
            dirString = "Left";
            break;
         case Direction.RIGHT:
            dirString = "Right";
            break;
         case Direction.UP:
            dirString = "Up";
            break;
         case Direction.DOWN:
            dirString = "Down";
            break;
      }
      return dirString;
   }
}