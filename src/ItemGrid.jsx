import React, {useState, useEffect} from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'react-bootstrap/Image'

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const style = {
    // height: 30,
    margin: 6,
    display: 'flex',
    // padding: 8
}

async function checkIsRemoved(url) {
    return new Promise(resolve => {
        fetch(url, {
            'Content-Type': 'application/json',
            })
                .then((result) => {
                let isRemoved = result.url.substring(20,27) == 'removed'
                console.log(result)
                if (isRemoved) {
                    console.log(`${url} is removed`)
                    resolve(true)
                }
                resolve(false)
                }, (error) => {
                console.log(error)
                console.log("Invalid imgur url")
            })
    })
    

    
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }


async function generateImgurURLS(num) {
    
        console.log(`Generating ${num} valid imgur urls`)
    
        let urls = []
        for(let i = 0; i < num; i++){
            var randomKey = randomString(5, chars)
            var myURL = `https://i.imgur.com/${randomKey}m.jpg`
            let isRemoved = await checkIsRemoved(myURL)
            while (isRemoved){
                console.log("generating new url")
                randomKey = randomString(5, chars)
                myURL = `https://i.imgur.com/${randomKey}m.jpg`
                isRemoved = await checkIsRemoved(myURL)
            }
            urls.push(myURL)
        }
        return urls
  
}

function ItemGrid() {

    const [state, setState] = useState({items: [] })

    useEffect(() => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight){
            console.log(`Window bottom is ${windowBottom}`)
            console.log(`Document height is ${docHeight}`)
            fetchMoreData()
        }
        
    },[state.items])
    
    async function fetchMoreData() {
        
        let newURLS = await generateImgurURLS(5)
        setState({items: state.items.concat(newURLS)})

    }


    return (
        <div className='container'>
            <InfiniteScroll
                dataLength = {state.items.length}
                next = {fetchMoreData}
                hasMore={true}
                hasChildren={true}
                loader={<h4>Loading...</h4>}
                pullDownToRefreshContent={
                    <h3 style={{textAlign: 'center'}}>&h8595; Pull down to refresh</h3>
                }
            >
                {state.items.map((url, index) => (
                    <div style={style} key={index}>
                        <h3>Image {index}</h3>
                        <Image src={url} />
                    </div>
                    
                ))}
                
            </InfiniteScroll>
        </div>
    );
    
}

export default ItemGrid