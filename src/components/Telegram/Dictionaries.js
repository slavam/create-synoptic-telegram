const cloudHeightArray = [{label: "< 50", value: '0'},
  {label: "50-100", value: '1'},
  {label: "100-200", value: '2'},
  {label: "200-300", value: '3'},
  {label: "300-600", value: '4'},
  {label: "600-1000", value: '5'},
  {label: "1000-1500", value: '6'},
  {label: "1500-2000", value: '7'},
  {label: "2000-2500", value: '8'},
  {label: "> 2500 или облаков нет", value: '9'},
  {label: "Неизвестно", value: '/'}]
const iRArray = [{label: "Включена в раздел 1", value: '1'}, 
  {label: "Не включена (осадков не было)", value: '3'}, 
  {label: "Не включена (осадки не измерялись)", value: '4'}, 
  {label: "Включена в раздел 5", value: '/'} ];
const iXArray = [{label: "Включена", value: '1'},
  {label: "Не включена (нет явлений)", value: '2'},
  {label: "Не включена (наблюдения не проводились)", value: '3'}];
const visibilityRangeArray = [
  {label: "< 50м.", value: "90"},
  {label: "50м.", value: "91"},
  {label: "200м.", value: "92"},
  {label: "500м.", value: "93"},
  {label: "1км.", value: "94"},
  {label: "2км.", value: "95"},
  {label: "4км.", value: "96"},
  {label: "10км.", value: "97"},
  {label: "20км.", value: "98"},
  {label: ">50км.", value: "99"}
]
const nCloudArray = [
  {label: "0 (облаков нет)", value: "0"},
  {label: '<=1 (но не 0)', value: "1"},
  {label: '2-3', value: "2"},
  {label: '4', value: "3"},
  {label: '5', value: "4"},
  {label: '6', value: "5"},
  {label: '7-8', value: "6"},
  {label: '>= 9 (но не 10, есть просветы)', value: "7"},
  {label: '10 (без просветов)', value: "8"},
  {label: 'Определить невозможно (затруднена видимость)', value: "9"},
  {label: 'Определить невозможно (наблюдения не проводились)', value: "/"},
];

export {cloudHeightArray, iRArray, iXArray, visibilityRangeArray, nCloudArray};