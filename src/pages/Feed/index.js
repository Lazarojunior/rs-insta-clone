import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Post, Header, Avatar, Name, PostImage, Description, Loading } from './styles';

export default function Feed() {
    const [feed, setFeed] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    async function loadPage(pageNumber = page, shouldRefresh = false) {
        console.log('loadPage', pageNumber);
        if(total && pageNumber > total) return;

        setLoading(true)

        const response = await fetch(
            `https://my-json-server.typicode.com/lazarojunior/rs-insta-clone/feed?_expand=author&_limit=5&_page=${pageNumber}`
        )

        const data = await response.json()
        const totalItems = response.headers.get('X-Total-Count')

        // console.warn(data);

        setTotal(Math.floor(totalItems / 5))
        setFeed(shouldRefresh ? data : [...feed, ...data])
        setPage(pageNumber + 1)
        setLoading(false)
    }

    async function refreshList() {
        console.log('refreshList');
        setRefreshing(true);

        await loadPage(1, true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    useEffect(() => {
        loadPage()
    }, [])


    // Loading inicial do APP
    if (loading && page === 1) {
        return <View style={{
          width: '100%',
          height: '100%'
        }}><Loading />
        </View>;
    }


    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={post => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                onRefresh={refreshList}
                refreshing={refreshing}
                // refreshControl={
                //    <RefreshControl
                //     refreshing={refreshing}
                //     onRefresh={refreshList}
                //    />
                //  }
                ListFooterComponent={loading && <Loading />}
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
