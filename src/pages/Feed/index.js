import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Post, Header, Avatar, Name, PostImage, Description } from './styles';

export default function Feed() {
    const [feed, setFeed] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    async function loadPage(pageNumber = page) {
        if(total && pageNumber > total) return;

        setLoading(true)

        const response = await fetch(
            `https://my-json-server.typicode.com/lazarojunior/rs-insta-clone/feed?_expand=author&_limit=5&_page=${pageNumber}`
        )

        const data = await response.json()
        const totalItems = response.headers.get('X-Total-Count')

        // console.warn(data);
        console.log(pageNumber);

        setTotal(Math.floor(totalItems / 5))
        setFeed([...feed, ...data])
        setPage(pageNumber + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadPage()
    }, [])

    // loadFeed()

    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={post => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading && <Loading /> }
                renderItem={({ item }) => (
                    <Post>
                        <Header>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{ item.author.name }</Name>
                        </Header>

                        <PostImage ratio={item.aspectRatio} source={{ uri: item.image }} />
                        <Description>
                            <Name>{ item.author.name }</Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </View>
    );
}
