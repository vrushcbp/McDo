import './mcd.scss'
import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import ViewCart from './ViewCart';

class PostList extends React.Component {

    state = {
        postList: [],
        addCart: [],
        subTotal: 0,
        itemCount: 1
    }

    componentDidMount() {
        axios.get('https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7')
            .then(res => {
                console.log(565, res);
                var datas = res.data;
                // datas = datas.slice(0, 5);
                this.setState({
                    postList: datas
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    appendImg = () => {
        console.log(234);
        return 'https://source.unsplash.com/200x200/?food,mcdonalds'
    }
    addToCart = (dt, items) => {
        var arr = [];
        // arr.push({
        //     id: dt.id,
        //     menu: dt.item_name,
        //     price: dt.price
        // })
        dt = {
            id: dt.id + "cart",
            menu: dt.item_name,
            itemCount: items,
            price: dt.price
        }
        console.log(234, arr, dt)
        this.setState({
            addCart: [...this.state.addCart, dt],
            itemCount: 1
        })

    }
    subTotalVal = () => {
        var subtot = 0;
        this.state.addCart.map(ct => {
            subtot += parseInt(ct.price) * parseInt(ct.itemCount);
        })
        console.log(789, subtot)
        return subtot;
    }
    render() {
        console.log(345, this.state.addCart)
        // var arr = JSON.parse(localStorage.getItem('cart-data'))
        // arr = [...arr, this.state.addCart]
        localStorage.setItem('cart-data', JSON.stringify(this.state.addCart));
        return (
            <div className="row">
                {/* <Router> */}
                <div className="col-8 column_box">
                    {
                        this.state.postList.map(dt => {
                            return (
                                <div className='menu_list row' key={dt.id}>
                                    <div className="col-8">
                                        <h5>{dt.item_name}</h5>
                                        <p>&#8377; {dt.price}</p>
                                        <p>wjvd hb uysvad uyabs dyu jfbdsfhbs jhb hbhbb hjbhj bjn sdyuva syudas dysauvduasd sauvasv yv uuvu  vuyv bjnh fxsz sx.</p>
                                        <button className='add_cart_btn' onClick={e => this.addToCart(dt, this.state.itemCount)}>Add To Cart</button>
                                    </div>
                                    <div className='col-4 img_cont'>
                                        <div>
                                            <div className='item_count list_item_count'><button onClick={e => {
                                                if (this.state.itemCount != 1) {
                                                    this.setState({
                                                        itemCount: this.state.itemCount - 1
                                                    })
                                                }
                                            }}>-</button><span>{this.state.itemCount}</span><button onClick={e => {
                                                this.setState({
                                                    itemCount: this.state.itemCount + 1
                                                })
                                            }}>+</button></div>
                                            <img className='menu_img' src="https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/pehlye7vsmxixm6pxzqz" /> </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='col-4 column_box'>
                    <div className='cart_tot_box'>
                        <h4>Cart</h4>
                        <p>{this.state.addCart.length} items</p>
                        <div className='cart_list_box scrollbar'>
                            {
                                this.state.addCart.map(ct => {
                                    return (
                                        <div className='cart_list' key={ct.id}>
                                            <h6 className='cart_menu_name' style={{color: 'grey'}}>{ct.menu} <span style={{color: 'black'}}>x {ct.itemCount}</span></h6>
                                            <p className='cart_list_price'>&#8377; {ct.price * ct.itemCount}</p>
                                            {/* <div className='item_count'>
                                                <button onClick={e => {
                                                this.setState({
                                                    itemCount: this.state.itemCount - 1
                                                })
                                            }}>-</button><span>{this.state.itemCount}</span><button onClick={e => {
                                                this.setState({
                                                    itemCount: this.state.itemCount + 1
                                                })
                                            }}>+</button>
                                            </div> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='cart_tot'>
                            <div>
                                <h4>Subtotal</h4>
                                <span>Extra Charges may apply</span>
                            </div>
                            <h4 className='cart_list_price'>&#8377; {this.subTotalVal()}</h4>
                        </div>
                        {this.state.addCart.length > 0 ? <button className='checkout_btn'>
                            <Link to="/cart">
                                CHECKOUT
                                </Link>
                        </button> : <button className='checkout_btn checkout_disable'>
                                {/* <Link to="/cart"> */}
                                    CHECKOUT
                                                {/* </Link> */}
                            </button>}
                    </div>
                </div>

            </div>
        )
    }
}

export default PostList;