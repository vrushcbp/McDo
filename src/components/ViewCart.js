import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class ViewCart extends React.Component {
    state = {
        cartData: [],
        subTotal: 0,
        discount: 0,
        finalPrice: 0,
        discountPerc: 0,
        emptyCart: false
    }
    componentDidMount() {
        var datas = JSON.parse(localStorage.getItem('cart-data'));
        // let history = useHistory();

        // history.push('/someRoute')
        // console.log(6786, history)
        // this.props.history.push('/', { some: 'state' })
        this.setState({
            cartData: datas
        }, this.calculateTotalPriceSummary)


    }
    calculateTotalPriceSummary = () => {
        var subtot = 0;
        var disco = 0;
        var perct = 0;
        this.state.cartData.map(ct => {
            subtot += parseInt(ct.price) * parseInt(ct.itemCount);
        })
        if (subtot <= 100) {
            disco = 0;
            perct = 0;
        } else if (subtot > 100 && subtot < 500) {
            disco = subtot * 10 / 100;
            perct = 10;
        } else {
            disco = subtot * 20 / 100;
            perct = 20;
        }
        console.log(789, subtot)
        this.setState({
            subTotal: subtot,
            discount: disco,
            finalPrice: subtot - disco,
            discountPerc: perct
        })
    }
    removeCardItem = (id, index) => {
        // debugger
        console.log(id)
        var arr = this.state.cartData;
        // const index = this.state.cartData.indexOf(id);
        if (index > -1) {
            arr.splice(index, 1);
            //   [...this.state.cartData, arr]
            this.setState({
                cartData: arr
            }, this.calculateTotalPriceSummary
            )
        }
        localStorage.setItem('cart-data', JSON.stringify(this.state.cartData))

        if (this.state.cartData.length == 0) {
            // cart empty asel tr redirect kr to="/" vr
            console.log(4567)
            this.setState({
                emptyCart: true
            })

        }
    }

    render(props) {
        console.log(456, this.state.cartData)
        if (this.state.emptyCart === true) {
            return <Redirect to='/' />
        }
        return (
            <div className='container'>
                <button className='backto_btn'><Link to='/'>Back to menu</Link></button>
                <div className='row'>
                    <div className='col-8 mt-3'>
                        <table>
                            <thead>
                                <tr>
                                    <th className=''>Action</th>
                                    <th style={{ width: '50%' }}>Product</th>
                                    <th className='text-center'>Quantity</th>
                                    <th className='text-center'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.cartData.map((dt, i) => {
                                        return (
                                            <tr key={dt.id}>
                                                <td>
                                                    <button class='remov_cart_btn' onClick={e => { this.removeCardItem(dt.id, i) }}>Remove</button>
                                                </td>
                                                <td style={{ display: 'flex' }}>
                                                    <img className='menu_img' style={{ width: '135px', height: '105px' }} src="https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/pehlye7vsmxixm6pxzqz" />
                                                    <span style={{ width: "200px", margin: 'auto 10px' }}>{dt.menu}</span>
                                                </td>
                                                <td className='text-center'>
                                                    {dt.itemCount}
                                </td>
                                                <td className='text-center'>
                                                    &#8377; {dt.price * dt.itemCount}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-4'>
                        <div className='summary_box_container'>
                        <div className='summary_box'>
                            <h4>Summary</h4>
                            <hr />
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '75%' }}>SUBTOTAL</td>
                                        <td><b>&#8377; {this.state.subTotal}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '75%' }}>DISCOUNT</td>
                                        <td>- <b>&#8377; {this.state.discount}</b></td>
                                    </tr>
                                </tbody>

                            </table>
                            <span className='discount_line'>{this.state.discountPerc == 0 ? '' : 'Congrats! you are eligible for ' + this.state.discountPerc + '% discount.'}</span>
                            <hr />
                            <table>
                                <tbody>

                                    <tr>
                                        <td style={{ width: '75%' }}>FINAL PRICE</td>
                                        <td><b>&#8377; {this.state.finalPrice}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className='proced_btn'>Proceed to Pay</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ViewCart;