export class AdminAccount {

  constructor(
    public readonly id: string,
    private _isOpen: boolean,
  ) { }

  open() {
    this._isOpen = true;
  }

  close() {
    this._isOpen = false;
  }

  isOpen() {
    return this._isOpen;
  }

  serialize() {
    return {
      id: this.id,
      isOpen: this._isOpen,
    };
  }

  static deserialize(data: ReturnType<typeof AdminAccount.prototype.serialize>) {
    return new AdminAccount(data.id, data.isOpen);
  }
}