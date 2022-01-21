import ImageColors from "react-native-image-colors";


export const getImageColors = async (uri:string)=>{
    
    const colors = await ImageColors.getColors(uri,{});

    let primary;
    let secundary;

    switch (colors.platform) {
        case 'android':
            // android result properties
            primary = colors.dominant;
            secundary = colors.average;
            break
        case 'ios':
            // iOS result properties
            primary = colors.primary;
            secundary = colors.secondary;
            break
        default:
            throw new Error('Unexpected platform key')
    }

    return[primary,secundary];
}