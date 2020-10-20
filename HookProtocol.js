/**
 * @Author: hqwx.com
 * @Date: 2020-09-10 17:43:48
 * @Desc: 拦截 URLscheme
 * @LastEditors: WRG(woter_wang@live.com)
 * @LastEditTime: 2020-10-19 17:59:35
 * @😍: 😃😃
 */
class HookProtocol {
	constructor(protocolLink) {
		let splitProtocol = protocolLink.split("?")
		this.protocol = splitProtocol[0]
		this.queryParams = splitProtocol[1]
		this.Params = this.parseParams
	}

	getValue(key = '') {
		return this.Params[key]
	}

	get parseParams() {
		let querys = this.queryParams.split("&");
		let params = {};
		querys.forEach(v => {
			let tempObj = v.split("=")
			params[tempObj[0]] = tempObj[1]
		})

		return params
	}
}

export default HookProtocol;

//eg:let P = new HookProtocol('app://redirect/test?id=8899')