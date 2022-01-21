
import React, { useContext, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import ImageColors from 'react-native-image-colors'
import { Dimensions, View,ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradienteBackground } from '../components/GradienteBackground';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const { width:windowWith } = Dimensions.get('window');

interface Props extends StackScreenProps<any,any>{};

export const HomeScreen = ({navigation}:Props)=> {

    const { nowPlaying,popular,topRated,upcoming,isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext(GradientContext);

    if(isLoading){
        return <Loading/>
    }

    const getPosterColor = async (index:number)=>{
        const movie = nowPlaying[index];
        const  uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

        const [primary='green',secondary='orange'] = await getImageColors(uri);

        setMainColors({primary,secondary})
    }

    useEffect( ()=>{
        if(nowPlaying.length > 0){
            getPosterColor(0);
        }
    },[nowPlaying]);

    return (
        <GradienteBackground>
            <ScrollView>
                <View style={{marginTop:top+10}}>
                    <View style={{height:440}}>
                        <Carousel
                            data={ nowPlaying! }
                            renderItem={ ({item}:any)=><MoviePoster movie={ item } /> }
                            sliderWidth={ windowWith }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={ 0.8}
                            onSnapToItem={ (index) => getPosterColor(index) }
                        />
                    </View>

                    {/* Peliculas populares */}
                    <HorizontalSlider title='Popular' movies={ popular! }/>
                    <HorizontalSlider title='Top rated' movies={ topRated! }/>
                    <HorizontalSlider title='Upcomming' movies={ upcoming! }/>
                </View>
            </ScrollView>
        </GradienteBackground>
    )
}
