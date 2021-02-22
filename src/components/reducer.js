export const initialState = {
     
    job:{
        username: '',
        jobName: '',
        headerInfo:{
            phone: '',
            orderDate: '',
            orderTakenBy: '',
            orderNumber: '',
            type:'',
            jobLocation: '',
            address: '',
            cityState: '',
            jobPhone: '',
            startingDate: '',
        },
        description: '',
        materials:[
            {
                qty: 1,
                material: '',
                price: 0,
                amount: 0
            }
        ],
        otherCharges: [
            {
                description: '',
                cost: 0
            }
        ],
        labor: [
            {
                name: '',
                hours: 0,
                rate: 0,
                amount: 0
            }
        ],
        totalLabor: 0,
        totalMaterials: 0,
        totalOther: 0,
        tax: 0,
        total: 0
        
        
    }

}

const reducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            console.log(action.item.user)
            // state.user = action.item.user
            state.user = action.item.user
            return{
                ...state,
                job: state.job,
                user: action.item.user
                
            }
        case 'LOAD_JOB':
            console.log("LOAD...")
            console.log(state)
            state.job = action.item.jobData
            state.jobName = action.item.jobName
            state.docName = action.item.docName
            state.username = action.item.username
            return{
                // ...state,
                job: action.item.jobData,
                jobName: action.item.jobName,
                docName: action.item.docName,
                username: action.item.username
            }
        case 'NEW_JOB':
            console.log('New Job')
            return{
                job: action.item.jobData,
                jobName: action.item.jobName,
                docName: action.item.docName,
                username: action.item.username
            }
        case 'OVERWRITE':
            
            state.job = action.item.job
            console.log(state.job)
            return{
                // ...state,
                job: action.item.job
            }
        case 'SAVE_MATERIALS':
            state.job.materials = action.item.data
            return{
                job: state.job
            }
        
        case 'ADD_CHAPTER_TITLE':
            state.chapters[action.item.chapterIndex].title = action.item.title
            console.log(state)
            return{
                ...state,
                //chapters:[action.item.entryIndex].title:
                
            }

        case 'MAKE_SECTION':
            //console.log(state)
            console.log(state.chapters[action.item.entryIndex].bodies)
            //if(action.item.entryIndex==0)
            state.chapters[action.item.chapterIndex].bodies = [...state.chapters[action.item.chapterIndex].bodies, action.item]
            //state.chapters[action.item.entryIndex].bodies[action.item.entryIndex] = action.item
            // for(let i = 0; i < state.chapters.length; i++){
            //     console.log('yo')
            // }
            return{
                 ...state,
               // newSection: action.item,
                // chapters: [
                //     {
                //         title: state.chapters[action.item.entryIndex].title,
                //         bodies: [...state.chapters[action.item.entryIndex].bodies, action.item]
                    
                //     }
                // ]
                chapters: [...state.chapters]
            }
        case 'EDIT_SECTION':
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex] = action.item
            return{
                ...state,
                chapters: [...state.chapters]

            }
        case 'DELETE_SECTION':
            let filteredSections = state.chapters[action.item.chapterIndex].bodies.filter(section => {
                return section !== state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex]
            })
            state.chapters[action.item.chapterIndex].bodies = filteredSections
            return{
                ...state,
                chapters: [...state.chapters]
            }
        case 'DELETE_CHAPTER':
            let filteredChapters = state.chapters.filter(chapter => {
                return chapter !== state.chapters[action.item.chapterIndex]
            })
            state.chapters = filteredChapters
            return{
                ...state,
                chapters: [...state.chapters]
            }
        case 'SET_USER':
            return{
                ...state,
                user: action.item.user
            }
        case 'LOAD_BOOK':
            return{
                ...state,
                chapters: action.item.chapters,
                bookTitle: action.item.bookTitle
            }
        case 'SIGN_OUT':
            return{
                ...state,
                user: ''
            }
        default:
            return state;
    }
}

export default reducer;