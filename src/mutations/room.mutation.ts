import { Mutation } from '.';
import { type Lecture } from '../lecture';
import { type Room, type InputModelData } from '../models';
import { rnd } from '../utils';

export class RoomMutation extends Mutation {
    mutate(lec: Lecture, inputs: InputModelData): Lecture {
        const possibles = inputs.rooms.filter(
            (room) => room.type === lec.room.type,
        );

        let newRoom: Room;
        while ((newRoom = rnd.choice(possibles)).id === lec.room.id);
        return lec.with({ room: newRoom });
    }
}
