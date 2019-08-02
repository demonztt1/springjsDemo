
let  Service =qGuan.find("service");
let Modular=qGuan.find("modular");
let ModularAop=qGuan.find("modularAop");
@Service("AAA")
export default class AAA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2,
            numbers:[1, 2, 3, 4, 5]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.render=this.render;
        this.setState=this.setState;
        this.appendChild=this.appendChild;
        this.NumberList=this.NumberList;

    }

    NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
            <li key={number.toString()}>
                {number}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }
    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("xxxxxxxxxxxx"+value)
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    参与:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    来宾人数:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}   />
                </label>
                <label>
                    来宾人数:  <h1> {this.state.numberOfGuests}</h1> </label>

                {this.NumberList({numbers:this.state.numbers})}
            </form>
        );
    }
}

