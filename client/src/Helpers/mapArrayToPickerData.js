export default function mapArrayToPickerData(arrayToMap){
        return arrayToMap.map(e=>{
            return {
                label:e.name,
                value:e._id
            }
        })
}