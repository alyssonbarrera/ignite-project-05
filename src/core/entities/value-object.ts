export class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public equals(valueObject: ValueObject<unknown>) {
    if (valueObject === null || valueObject === undefined) {
      return false
    }

    if (valueObject.props === undefined) {
      return false
    }

    return JSON.stringify(this.props) === JSON.stringify(valueObject.props)
  }
}
