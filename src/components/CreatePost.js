import React from 'react';
import axios from 'axios';
import PostList from './PostList';

class CreatePost extends React.Component{
    state={
        post: "",
        postedData: {},
        postList: []
    }
    onInputhandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmitHandler = () => {
        console.log(1245, this.state.post)
        axios.post('http://localhost:4000/api/postData', {
            post: this.state.post,
            date: new Date().toLocaleString()
        })
        .then( res => {
            console.log(34,res)
            this.setState({
                postedData: {
                    post: this.state.post,
                    date: new Date().toLocaleString()
                },
                post: ""
            })
            console.log(456, this.state.postedData)


            axios.get('http://localhost:4000/api/getData')
        .then( res => {
            console.log(565, res);
            const datas = res.data;
            this.setState({
                postList: datas
            })
        })
        .catch( err => {
            console.log(err)
        })

        })
        .catch( err => {
            console.log(err)
        })

    }

    // removePost = (id) => {
    //     axios.post('http://localhost:4000/api/postData', {
    //         id: id
    //     })
    //     .then( res => {
    //         console.log('res', res)
    //     })
    //     .catch( err => {
    //         console.log(23, err)
    //     })
    // }

    componentDidMount(){
        axios.get('http://localhost:4000/api/getData')
        .then( res => {
            console.log(565, res);
            const datas = res.data;
            this.setState({
                postList: datas
            })
        })
        .catch( err => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className='container cont_box'>
                <div className="post_box">
                <textarea placeholder="Add your notes..." className="textarea_box" name='post' value={this.state.post} max-width="400px" width="300px" onChange={this.onInputhandler}></textarea><br></br>
                <button width="100%" className='btn btn-primary btn_post' onClick={this.onSubmitHandler}>Post</button>
            </div>
            <div className='post_list scrollbar'>
            {/* <PostList isdatachanged={this.callbackFunc} /> */}
            {
                    this.state.postList.map( dt => {
                        return <div className='list_items' key={dt.id}>{dt.post}<span class='list_date'>{dt.date}</span> <span className="btn_remove" onClick={ e => {
                            axios.post('http://localhost:4000/api/delPost', {
                                id: dt.id
                            })
                            .then( res => {
                                console.log('res', res)
                            })
                            .catch( err => {
                                console.log(23, err)
                            })
                        }}>x</span>
                        <span className="btn_edit" onClick={ e => {
                            // axios.post('http://localhost:4000/api/editPost', {
                            //     id: dt.id,
                            //     post: "testin---|---edit"
                            // })
                            // .then( res => {
                            //     console.log('res', res)
                            // })
                            // .catch( err => {
                            //     console.log(23, err)
                            // })
                        }}>edit</span></div>
                    })
                }
            </div>
            </div>
        
        )
    }
}

export default CreatePost;