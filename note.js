

class Title extends React.Component {
	render(){
		return(
			<div className="title">
				<h1>{this.props.name}</h1>
			</div>
		)
	}
}
class Sort extends React.Component {
	setSort=(e)=>{
		this.props.sort(e.target.value)
	}
	render(){
		return(
			<form className="form-group col-md-3">
				<select className="form-control" onChange={this.setSort}>
					<option>Sort...</option>
					<optgroup label="Sort by Alphabet">
						<option value="az">A-Z</option>
						<option value="za">Z-A</option>
					</optgroup>
					<optgroup label="Sort by Date">
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
					</optgroup>
				</select>
			</form>
		)
	}
}
class Search extends React.Component {
	search=(e)=>{
		e.preventDefault()
		this.props.search(this.refs.input.value.toLowerCase())
	}
	clear=(e)=>{
		e.preventDefault()
		this.props.search('')
		this.refs.input.value=''
	}
	render(){
		return(
			<form className="form-group col-md-5">
				<div className="input-group">
					<input ref="input" className="form-control" 
						placeholder="Search for..." 
						onChange={(e)=>{this.props.search(e.target.value)}}
					/>
					<div className="input-group-append">
						<button className="btn btn-danger" onClick={this.clear}>
							<span className="fa fa-window-close"></span>
						</button>
					</div>
					<div className="input-group-append">
						<button className="btn btn-primary" onClick={this.search}>
							<span className="fa fa-search"></span>
						</button>
					</div>
				</div>
			</form>
		)
	}
}
class Menu extends React.Component {
	render(){
		return(
			<div className="row">
				<Search search={this.props.search} />
				<Sort sort={this.props.sort} />
                {this.props.showRecycle?
                <form className="form-group col-md-2">
					<button className="btn btn-primary btn-block" 
					onClick={e=>this.props.toggleRecycle(e)}>Note</button>
				</form>
                :<form className="form-group col-md-2">
					<button className="btn btn-success btn-block" 
					onClick={e=>this.props.toggleRecycle(e)}>Recycle</button>
				</form>}
				<form className="form-group col-md-2">
					{this.props.showRecycle?
					<button 
                        className="btn btn-danger btn-block" 
                        onClick={e=>this.props.cleanRecycle(e)}
                    >Clear All</button>
					:<button 
                        className="btn btn-primary btn-block" 
                        onClick={e=>this.props.addList(e)}
                    >New note</button>}
				</form>
			</div>
		)
	}
}
class Item extends React.Component {
	render(){
		const item=this.props.item
		const time=new Date(item.createAt)
		return(
			<li 
                key={item.id}
                className={this.props.className}
                onClick={()=>{this.props.show(this.props.index)}}
                style={{}}
                >
                <div style={{overflow:'hidden'}}>
               		{item.title==''?'...'+item.content:item.title}
             		<br/><small style={{whiteSpace:'nowrap'}}>{time.toLocaleString()}</small>
             	</div>
            </li>
		)
	}
}
class List extends React.Component {
	createElm=(list,search,globalIndex,selectedClass)=>{
		const len=list.length
		let elm=[]
        if(search!=''){
			list.forEach((item,index)=>{
				if(item.title.toLowerCase().indexOf(search)>-1
				    ||item.content.toLowerCase().indexOf(search)>-1)
				{
                    elm.push(<Item item={item} index={index} show={this.props.show} className='list-group-item'/>)
                    if (index==globalIndex){
                    	const lenElm=elm.length
						elm[lenElm-1].props.className+=selectedClass
                    }
                }
            })
		}
        else{
             elm= list.map((item,index)=>{
                return <Item item={item} index={index} show={this.props.show} className='list-group-item'/>
            })  
			if(len>0) {
				elm[globalIndex].props.className+=selectedClass
			}
        }
        return elm
	}
	render(){
		const showRecycle=this.props.showRecycle
		const selectedClass=showRecycle?' bg-success text-white':' bg-primary text-white';
		const list=showRecycle?this.props.recycle:this.props.list
        const index=this.props.index
        const search=this.props.search
        const elm=this.createElm(list,search,index,selectedClass)
		return(
			<ul className="col-3 list-group" style={{overflow:'auto'}}>
				{elm}
			</ul>
		)
	}
}
class Main extends React.Component {
	render(){
		const showRecycle=this.props.showRecycle
		const list=showRecycle?this.props.recycle:this.props.list
        const len=list.length
		const index=this.props.index
		return(
			<div className="col-9" style={{display:'grid',gridTemplateRows:'auto 1fr'}}>
				<div className="row form-group">
					<div className="input-group">
						<input type="text" 
						name="title"
						className="form-control"
						value={len>0&&index>-1?list[index].title:''}
						onChange={!showRecycle?(e)=>this.props.edit(e):null}
						readonly={showRecycle}
						/>
						{showRecycle&&<div className="input-group-append">
							<button className="btn btn-danger"
							onClick={this.props.permanentlyDelete}>Del</button>
						</div>}
						{showRecycle?
						<div className="input-group-append">
							<button className="btn btn-success"
							onClick={this.props.recover}>Recover</button>
						</div>
						:<div className="input-group-append">
							<button className="btn btn-danger"
							onClick={this.props.del}>Del</button>
						</div>}
					</div>
				</div>
				<div className="row" style={{}}>
					<textarea type="text" 
					name="content"
					style={{}}
					className="form-control"
					value={len>0&&index>-1?list[index].content:''}
					onChange={!showRecycle?(e)=>this.props.edit(e):null}
					readonly={showRecycle}
					/>
				</div>
			</div>
		)
	}
}
class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			index: 0,
            counter: 0,
			sort: "newest",
			list: [],
			search: '',
			recycle: [],
			showRecycle: false,			
		};
		this.show=this.show.bind(this)
	}
	componentWillMount(){
		const localList = data
		//const localList=JSON.parse(localStorage.getItem('list'))
		const localRecycle = JSON.parse(localStorage.getItem('recycle'))
        let counter=0;
		if(localRecycle!==null&&localRecycle.length>0){
			this.state.recycle=localRecycle
			localRecycle.forEach((item)=>{
				if(item.id>counter) counter=item.id
			})
		}
		if(localList!==null&&localList.length>0){
			const lenList=localList.length
			this.state.list=localList
            this.state.counter=lenList
            localList.forEach((item)=>{
				if(item.id>counter) counter=item.id
			})
		}
		this.setState({
			index: 0,
			counter: counter,
		})
	}

    update=()=>{
    	localStorage.list=JSON.stringify(this.state.list)
		localStorage.recycle=JSON.stringify(this.state.recycle)
        localStorage.counter=JSON.stringify(this.state.counter)
    }
	toggleRecycle=(e)=>{
		e.preventDefault()
        const list=this.state.showRecycle?this.state.list:this.state.recycle//bi nguoc do chua set showRecycle
		const len=list.length
		this.setState({
			index: 0,
            search:'',
			showRecycle: !this.state.showRecycle
		})
	}
	addItem=(e)=>{
		e.preventDefault()
		if(!this.state.showRecycle){
			const list=this.state.list
			const len=list.length
			if(len==0||list[0].title!==''||list[0].content!==''){
				const date=new Date()
                const blankItem={id:this.state.counter+1,title: '',content: '',createAt:date}
				this.setState({
                    counter: this.state.counter+1,
					list: [blankItem,...this.state.list],
                    index: 0,
				})
			}
		}
	}
	setSort=(sort)=>{
		if(sort=="az"||sort=="za"||sort=="newest"||sort=="oldest"){
            const list=this.state.list
            let sortList
			switch(sort){
                case "oldest": 
                    sortList=list.sort((a,b)=>{return new Date(a.createAt).getTime()-new Date(b.createAt).getTime()})
                    break;
                case "newest": 
                    sortList=list.sort((a,b)=>{return new Date(b.createAt).getTime()-new Date(a.createAt).getTime()})
                    break;
                case "az": 
                    sortList=list.sort((a,b)=>{return a.title.localeCompare(b.title)})
                    break;
                case "za":
                    sortList=list.sort((a,b)=>{return b.title.localeCompare(a.title)})
                    break;
		   }
            this.setState({list:sortList},()=>{
            	this.update()
            })
		}   
	}
	del=()=>{
		const list=this.state.list
		const len=list.length
		let index=this.state.index
		if(len>0&&index>-1){
            const isBlank=list[index].title==''&&list[index].content==''
            const recycleItem=list.splice(index,1)
			if(!isBlank){
				this.state.recycle.unshift(recycleItem[0])
			}
			if(this.state.search!==''){
				index=-1
			}
			else if(len>1&&index==len-1){
				index--
			}
			this.update()
			this.setState({
				index: index
			})
		}
	}
	permanentlyDelete=()=>{
		const recycle=this.state.recycle
		const len=recycle.length
		let index=this.state.index
		if(len>0&&index>-1){
            const recoverItem=recycle.splice(index,1)
            if(this.state.search!==''){
				index=-1
			}
			else if(len>1&&index==len-1){
				index--
			}
			this.update()
			this.setState({
				index: index
			})
		}
	}
	cleanRecycle=(e)=>{
		e.preventDefault()
		const confirm=window.confirm("Are you sure want to delete ALL?")
		if(confirm){
			this.state.recycle.length=0
			this.update()
			this.setState({
				index: 0,
			})
		}
	}
	recover=(e)=>{
		const recycle=this.state.recycle
		const len=recycle.length
		let index=this.state.index
		if(len>0&&index>-1){
			const recoverItem=recycle.splice(index,1)
            this.state.list.unshift(recoverItem[0])
			if(this.state.search!==''){
				index=-1
			}
			else if(len>1&&index==len-1){
				index--
			}
			this.update()
			this.setState({
				index: index
			})
		}
	}
	edit=(e)=>{
		const len=this.state.list.length
		if(len==0){
			const date=new Date()
			this.state.list[this.state.index]={id:this.state.counter+1,title:'',content:'',createAt:date}
            this.state.counter++
		}
		this.state.list[this.state.index][e.target.name]= e.target.value
		this.update()
		this.setState({
			index: this.state.index,
		})
	}
	search=(search)=>{
		if(search!=''||search==''&&this.state.search!=''){
			let list=this.state.showRecycle?this.state.recycle:this.state.list
			let index= list.findIndex((item,i) =>{
				return item.title.toLowerCase().indexOf(search)>-1
				    ||item.content.toLowerCase().indexOf(search)>-1
			})//ko co thi return -1
			this.setState({
				index: index,
				search: search,
			})
		}
	}
	show=(index)=>{
		this.setState({
			index: index,
		})
	}
	

	render(){
       //  console.log(this.state.index)
         // console.log(this.state.list)
//        console.log(this.state.recycle)
		return(
			<div style={{minHeight:'100%' ,display:'flex',flexDirection:'column',padding:10}}>
				<div style={{display: 'flex',justifyContent:'space-between'}}>
					<Title name="Note List"/>
					<div className="note-btn">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				
				<Menu 
					search={this.search} 
					addList={this.addItem} 
					sort={this.setSort} 
					toggleRecycle={this.toggleRecycle}
                    showRecycle={this.state.showRecycle}
                    cleanRecycle={this.cleanRecycle}
				/>
				<div className="border" style={{display:'flex',flex:'1',padding:'5px'}}>
					<List 
						search={this.state.search} 
						show={this.show} 
						index={this.state.index} 
						list={this.state.list} 
						sort={this.state.sort} 
						recycle={this.state.recycle}
						showRecycle={this.state.showRecycle}
						cleanRecycle={this.cleanRecycle}
					/>
					<Main
						list={this.state.list}
						index={this.state.index}
						del={this.del} 
						edit={this.edit}
						recycle={this.state.recycle}
						showRecycle={this.state.showRecycle}
						recover={this.recover}
						permanentlyDelete={this.permanentlyDelete}
					/>
				</div>
			</div>
		)
	}
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);