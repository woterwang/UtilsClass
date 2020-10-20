/**
 * @name: City Class
 * @description:
 * @param {type}
 * @return:
 */
class City {
	constructor(sourceData) {
		this.sourceData = sourceData;

		this.Data = {
			province: [],
			city: [],
			area: [],
		};

		this.provinceKey = 0;

		this.cityKey = 0;

		this.areaKey = 0;

		this.province();
	}

	set updateProvince (data) {
		this.Data.province = data;
	}

	set updateCity (data) {
		this.Data.city = data;
	}

	set updateArea (data) {
		this.Data.area = data;
	}

	getProvinceItem(code){
		let item = this.Data.province.filter(v => v.code === code)[0]
		this.city(item.key);
		return item;
	}

	getCityItem(code){
		let item = this.Data.city.filter(v => v.code === code)[0]
		this.area(item.key);
		return item;
	}

	getAreaItem(code){
		return this.Data.area.filter(v => v.code === code)[0]
	}

	getFullAreaItem(provinceCode=0,cityCode=0,areaCode=0){
		return {
			provinceData:this.getProvinceItem(provinceCode),
			cityData:this.getCityItem(cityCode),
			areaData:this.getAreaItem(areaCode),
		}
	}

	province (code = 0) {
		this.provinceKey = code;
		this.updateProvince = this.setValue(this.sourceData[ `${ code }` ]);
		this.updateCity = this.setValue(this.sourceData[ `${ code }_${ code }` ]);
		this.updateArea = this.setValue(this.sourceData[ `${ code }_${ code }_${ code }` ]);
	}

	city (code = 0) {
		this.cityKey = code;
		this.updateCity = this.setValue(this.sourceData[ `${ this.provinceKey }_${ code }` ]);
		this.updateArea = this.setValue(this.sourceData[ `${ this.provinceKey }_${ code }_0` ]);
	}

	area (code = 0) {
		this.areaKey = code;
		this.updateArea = this.setValue(this.sourceData[ `${ this.provinceKey }_${ this.cityKey }_${ code }` ]);
	}

	setValue (data) {
		if (Array.isArray(data)) {
			return data.map((v, i) => ({
				value: v.split("-")[ 0 ],
				key: i,
				code: Number(v.split("-")[ 1 ])
			}))
		} else {
			return []
		}
	}
}

export default City;
