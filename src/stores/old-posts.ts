import {reactive, readonly} from 'vue'

interface PostState {
    foo: string
}
 export class PostStore 
 {
    #state: PostState

    constructor() 
    {
        this.#state = reactive<PostState>({
            foo:'foo'
        })
    }
    getState()
    {
        return readonly(this.#state)
    }
    updateState(foo:string )
    {
        this.#state.foo= foo

    }
 }

 const store = new PostStore()

 export function useStore()
 {
    return store
 }