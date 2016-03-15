import React from 'react'
import ReactDOM from 'react-dom'

var CommentBox = React.createClass({
    getInitialState() {
        return { data: [] }
    },
    componentDidMount() {
        var data = [
            { id: 1, author: "Neymar", text: "This is Neymar" },
            { id: 2, author: "Ronaldo", text: "This is Ronaldo" },
            { id: 3, author: "Messi", text: "This is Messi" }
        ]
        this.setState({ data: data })
    },
    handleCommentSubmit(comment) {
        // TODO: submit to the server and refresh the list
        alert(JSON.stringify(comment))
    },
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>

        )
    }
})
var CommentList = React.createClass({
    render() {
        var commentNodes = this.props.data.map((comment) => {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            )
        })
        console.log(commentNodes)
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        )
    }
})

var CommentForm = React.createClass({
    handleSubmit(e) {
        e.preventDefault()
        var author = this.refs.author.value.trim()
        var text = this.refs.text.value.trim()
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text })
        this.refs.author.value = ''
        this.refs.text.value = ''
        return;
    },
    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        )
    }
})
var Comment = React.createClass({
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        )
    }
})

ReactDOM.render(
    <CommentBox url="/api/comments"/>,
    document.getElementById('react-content')
)