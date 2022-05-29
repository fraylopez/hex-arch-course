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

  toPrimitives() {
    return {
      id: this.id,
      isOpen: this._isOpen,
    };
  }

  static fromPrimitives(data: ReturnType<typeof AdminAccount.prototype.toPrimitives>) {
    return new AdminAccount(data.id, data.isOpen);
  }
}