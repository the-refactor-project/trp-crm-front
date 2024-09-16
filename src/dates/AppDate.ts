class AppDate {
  constructor(public isoDate: Date | string) {}

  public format(): string {
    const date = new Date(this.isoDate);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
}

export default AppDate;
