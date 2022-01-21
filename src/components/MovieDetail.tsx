import React from 'react'
import { FlatList, Text, View } from 'react-native';
import currendy from 'currency-formatter';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';
import { ActorItem } from './ActorItem';

interface Props{
    movieFull:MovieFull,
    cats:Cast[]
}

export const MovieDetail = ({movieFull,cats}:Props)=> {
    return (
        <>
            <View style={{marginHorizontal:20}}>
                <View style={{flexDirection:'row'}}>
                    <Icon name='star-outline' size={ 16 } color='grey'/>
                    <Text>{ movieFull.vote_average }</Text>
                    <Text style={{marginLeft:5}}>
                        - { movieFull.genres.map(g=>g.name).join(', ')}
                    </Text>
                </View>  

                {/* historia */}
                <Text style={{fontSize:23,marginTop:10,fontWeight:'bold'}}>
                    Historia
                </Text>
                <Text style={{fontSize:16}}>{ movieFull.overview}</Text>

                <Text style={{fontSize:23,marginTop:10,fontWeight:'bold'}}>
                    Presupuesto
                </Text>
                <Text>{currendy.format(movieFull.budget,{code:'USD'})}</Text>
            </View>
            <View style={{marginTop:10,marginVertical:20}}>
                <Text style={{fontSize:23,marginTop:10,fontWeight:'bold',marginHorizontal:20}}>
                    Actores
                </Text>
                <FlatList
                    data={ cats }
                    keyExtractor={ (item)=>item.id.toString()}
                    renderItem={ ({item})=> <ActorItem actor={ item }/>}
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    style={{marginTop:10,height:70}}
                />
            </View>

        </>
    )
}
