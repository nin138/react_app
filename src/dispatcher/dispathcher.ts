import { Dispatcher } from 'flux'

const instance = new Dispatcher<any>();
export default instance

export const dispatch = instance.dispatch.bind(instance);