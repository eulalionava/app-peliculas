import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParam } from '../navigation/Navigation';
import { useMoviesDetail } from '../hooks/useMoviesDetail';
import { MovieDetail } from '../components/MovieDetail';

interface Props extends StackScreenProps<RootStackParam,'Detalle'>{};

const screen = Dimensions.get('screen').height;

export const DetailScreen = ({route,navigation}:Props)=> {


    const movie = route.params;
    const  uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
    

    const { isLoading,movieFull,cast } = useMoviesDetail(movie.id);

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.posterImage}
                />
            </View>
            <View style={styles.containerTitle}>
                <Text style={styles.subtitle}>{ movie.original_title}</Text>
                <Text style={styles.title}>{ movie.title}</Text>
            </View>
            {
                isLoading 
                ? <ActivityIndicator size={ 25 } color='grey' style={{marginTop:20}}/>
                : <MovieDetail movieFull={ movieFull! } cats={cast}/>
            }

            {/* Boton regresar */}
            <View style={styles.back}>
                <TouchableOpacity
                    onPress={ ()=> navigation.pop()}
                >
                    <Icon
                        name="arrow-back-outline"
                        color='white'
                        size={ 40 }
                    />
                </TouchableOpacity>
            </View>
                
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer:{
        width:'100%',
        overflow:'hidden',
        height:screen * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 5.46,

        elevation: 9,
        borderBottomStartRadius:15,
        borderBottomEndRadius:15
    },
    posterImage:{
        flex:1
    },
    containerTitle:{
        marginHorizontal:20,
        marginTop:20
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    subtitle:{
        fontSize:16,
        opacity:0.8
    },
    back:{
        position:'absolute',
        zIndex:999,
        elevation:9,
        top:10,
        left:10
    }
});