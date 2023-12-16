var STANDARD_AQI = [
    [0,25,50,100,200],  //AQI 
    [0,25,37,50,90],    //PM25 
    [0,50,80,120,180],  //PM10 
    [0,35,50,70,120],   //O3 
    [0,4.4,6.4,9,30],   //CO 
    [0,60,106,170,340], //NO2 
    [0,100,200,300,400],    //SO2 
];
var AQI_PARAM_NAME = {
    "PM25":"PM<sub>2.5</sub>",
    "PM10":"PM<sub>10</sub>",
    "O3":"O<sub>3</sub>",
    "CO":"CO",
    "NO2":"NO<sub>2</sub>",
    "SO2":"SO<sub>2</sub>"
};
var AQI_COLORS = ['#2bace1','#7bae2b','#fff70f','#e97c00','#be000e'];
var PM25R = {};
PM25R['verygood'] = {};
PM25R['verygood']['key'] = 'verygood';
PM25R['verygood']['title'] = 'คุณภาพอากาศดีมาก';
PM25R['verygood']['detail'] = 'เหมาะสำหรับกิจกรรมกลางแจ้งและการท่องเที่ยว';
PM25R['verygood']['color'] = '#2bace1';
PM25R['verygood']['width'] = '31';
PM25R['good'] = {};
PM25R['good']['key'] = 'good';
PM25R['good']['title'] = 'คุณภาพอากาศดี';
PM25R['good']['detail'] = 'สามารถทำกิจกรรมกลางแจ้งและการท่องเที่ยวได้ตามปกติ';
PM25R['good']['color'] = '#7bae2b';
PM25R['good']['width'] = '27';
PM25R['moderate'] = {};
PM25R['moderate']['key'] = 'moderate';
PM25R['moderate']['title'] = 'คุณภาพอากาศปานกลาง';
PM25R['moderate']['detail'] = 'สามารถทำกิจกรรมกลางแจ้งได้ตามปกติ <u>ผู้ที่ต้องดูแลสุขภาพเป็นพิเศษ</u>ควรลดระยะเวลาการทำกิจกรรมกลางแจ้ง';
PM25R['moderate']['color'] = '#fff70f';
PM25R['moderate']['width'] = '35';
PM25R['sensitive'] = {};
PM25R['sensitive']['key'] = 'sensitive';
PM25R['sensitive']['title'] = 'เริ่มมีผลต่อสุขภาพ';
PM25R['sensitive']['detail'] = 'ควรเฝ้าระวังสุขภาพ หรือใช้อุปกรณ์ป้องกันตนเอง <u>ผู้ที่ต้องดูแลสุขภาพเป็นพิเศษ</u>  ควรลดระยะเวลาการทำกิจกรรมกลางแจ้ง หรือใช้อุปกรณ์ป้องกันตนเอง';
PM25R['sensitive']['color'] = '#e97c00';
PM25R['sensitive']['width'] = '28';
PM25R['unhealthy'] = {};
PM25R['unhealthy']['key'] = 'unhealthy';
PM25R['unhealthy']['title'] = 'มีผลต่อสุขภาพ';
PM25R['unhealthy']['detail'] = 'ทุกคนควรหลีกเลี่ยงกิจกรรมกลางแจ้ง พื้นที่ที่มีมลพิษทางอากาศสูง หรือใช้อุปกรณ์ป้องกันตนเองหากมีความจำเป็น';
PM25R['unhealthy']['color'] = '#be000e';
PM25R['unhealthy']['width'] = '25';
PM25R['nan'] = {};
PM25R['nan']['key'] = 'nan';
PM25R['nan']['title'] = 'กำลังประมวลผล...';
PM25R['nan']['color'] = '#cccccc';

function calc_aqi(average, fieldName){
    if(average<0) return "-";
    if(average==="") return "-";
    if(isNaN(average)) return "-";
    
    if(fieldName=="AQI")
        return "-";
    else if(fieldName=="PM25") 
        fieldNum=1;
    else if(fieldName=="PM10") 
        fieldNum=2;
    else if(fieldName=="O3") 
        fieldNum=3;
    else if(fieldName=="CO") 
        fieldNum=4;
    else if(fieldName=="NO2") 
        fieldNum=5;
    else if(fieldName=="SO2") 
        fieldNum=6;
    else 
        return "-";
    
    var stepAdd;
    if(fieldNum==4){
        average = average.toFixed(1);
        stepAdd = 0.1;
    }
    else{
        average = average.toFixed(0);
        stepAdd = 1.0;
    }
    //console.log("fieldNum = "+fieldNum+"; average = "+average);
    
    
    /*
    if(average > STANDARD_AQI[fieldNum][4]) {
        diff = STANDARD_AQI[fieldNum][4]-STANDARD_AQI[fieldNum][3];
        over = (average-STANDARD_AQI[fieldNum][4])*100/diff;
        over = parseInt(over.toFixed(0));
        if(over == 0) over=1;
        
        return STANDARD_AQI[0][4]+over;
    }
    else {
        for(i=3;i>=0;i--){
            if(average == STANDARD_AQI[fieldNum][i]) {
                return STANDARD_AQI[0][i+1];
            }
            else if(average > STANDARD_AQI[fieldNum][i]) {
                aqiLv = STANDARD_AQI[0][i];
                average -= STANDARD_AQI[fieldNum][i];
                
                aqiDiff = STANDARD_AQI[0][i+1]-STANDARD_AQI[0][i];
                valueDiff = STANDARD_AQI[fieldNum][i+1]-STANDARD_AQI[fieldNum][i];
                
                aqiLv += (average * aqiDiff) / valueDiff;
                //console.log(""+i+": "+average+"*"+aqiDiff+"/"+valueDiff);
                aqiLv = parseInt(aqiLv.toFixed(0));
                if(aqiLv == STANDARD_AQI[0][i])
                    aqiLv ++;
                return aqiLv;
            }
        }
        return 0;
    }
    */
    
    for(i=1;i<=4;i++){
        if(average <= STANDARD_AQI[fieldNum][i]) {
            average -= STANDARD_AQI[fieldNum][i-1]+(i==1?0:stepAdd);
            aqiDiff = STANDARD_AQI[0][i]-(STANDARD_AQI[0][i-1]+(i==1?0:1));
            valueDiff = STANDARD_AQI[fieldNum][i]-(STANDARD_AQI[fieldNum][i-1]+(i==1?0:stepAdd));
            
            aqiLv = STANDARD_AQI[0][i-1]+(i==1?0:1);
            aqiLv += (average * aqiDiff) / valueDiff;
           // console.log(""+i+": "+average+"*"+aqiDiff+"/"+valueDiff);
            return parseInt(aqiLv.toFixed(0));
        }
    }
    //console.log("average = "+average);
    average -= STANDARD_AQI[fieldNum][4];

    if(fieldNum==1)
        return average+200;
    else if(fieldNum==2){
        average=201+((average-1)*0.5);
        return parseInt(average.toFixed(0));
    }
    else if(fieldNum==3)
        return average+200;
    return 201;
}
function cirColor(aqi){
    if(aqi>200)aqiLevel=4;
    else if(aqi>100)aqiLevel=3;
    else if(aqi>50)aqiLevel=2;
    else if(aqi>25)aqiLevel=1;
    else aqiLevel=0;
    return AQI_COLORS[aqiLevel];
}
function PM25cirRange(average){
    //console.log('ca '+average);
    if(average>90)averageLevel='unhealthy';
    else if(average>50)averageLevel='sensitive';
    else if(average>37)averageLevel='moderate';
    else if(average>25)averageLevel='good';
    else if(average >= 0) averageLevel='verygood';
    else averageLevel='na';
    return PM25R[averageLevel];
}