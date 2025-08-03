export class CourseEntity {
  constructor(
    public id: number,
    public name: string,
    public level: string,
    public kind: string,
    public shift: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
