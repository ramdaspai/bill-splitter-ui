export class Roommate {
  public id?: string;
  public name?: string;
  public gender?: string;
  public phone?: string;
  public amount?: number;

  constructor(name: string, gender: string, phone: string) {
    this.name = name;
    this.gender = gender;
    this.phone = phone;
  }
}
