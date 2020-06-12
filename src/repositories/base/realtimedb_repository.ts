import FirebaseContext from 'tymon/modules/firebase';

export default class RealtimeDBRepo<Model> extends FirebaseContext {
    private ref: string;

    public constructor(ref: string) {
        super();
        this.ref = ref;
    }

    public async find(id: string): Promise<Model | undefined> {
        const db = RealtimeDBRepo.getInstance().database();
        return db
            .ref(`${this.ref}/${id}`)
            .once('value')
            .then((res: any): Model => res.val());
    }

    public async create(id: string, data: Partial<Model>): Promise<void> {
        const db = await RealtimeDBRepo.getInstance().database();
        return db.ref(`${this.ref}${id}`).set(data);
    }

    public async update(id: string, data: Partial<Model>): Promise<void> {
        const db = await RealtimeDBRepo.getInstance().database();
        return db.ref(`${this.ref}/${id}`).update(data);
    }

    public async remove(id: string): Promise<void> {
        const db = await RealtimeDBRepo.getInstance().database();
        return db.ref(`${this.ref}/${id}`).remove();
    }
}