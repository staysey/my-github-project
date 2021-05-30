import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRepo} from '../../actions/index'
import {getOffset, getRepo} from '../../selectors'
import {fetchUser, loadMoreRepo} from '../../actions/index'
import {getUser} from '../../selectors'
import multipleUsers from '../../svg/multiple-users.svg';
import oneUser from '../../svg/user.svg';
import gitLogo from '../../svg/git.svg';
import StartPage from "../startPage";
import UserNotFoundPage from "../userNotFoundPage";
import EmptyRepo from "../emptyRepo";
import Pagination from 'react-paginating';


class Repo extends Component
{


    constructor(props){
        super(props)
        this.state = {
            value: '',
            loading: true,
            limit: 4,
            offset: 0,
            pageCount: 4,
            currentPage: 1,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
      //  this.handlePageClick = this.handlePageClick.bind(this);

    }


    handleRepoChange = page => {
        const {limit} = this.state
        this.setState({
            currentPage: page,
            offset: limit*(page-1)
        });
        const {repo} = this.props
        this.renderRepoList(repo)
    };


    handleChange(event) {
        const {repo} = this.props
        this.setState({
            loading: false,
            value: event.target.value,

        })
    }
    handleSubmit(event) {
        event.preventDefault()
        this.props.fetchUser((this.state.value))
        this.props.fetchRepo((this.state.value))
    }

    renderUser(repo, user){
        const url = 'https://github.com/' + user.login;
        if(this.state.loading)  return (
        <div className="view-container">
            <div className="loader"> </div>
        </div>
        )
        else
        return(
            <div className='main-container'>
                <div className='user-container'>
                    <div>
                        <img
                            className='round sm-svg-user'
                            src={user.avatar_url}
                            alt={user.login}
                        />
                    </div>
                    <div className=''>
                    <h4 className='user-name' >{user.name}</h4>
                    <div className='user-login'><a href={url} target="_blank">{user.login}</a></div>
                    <p><img className = 'svg-users' src={multipleUsers} alt="multiple users" />{user.followers} followers
                        <img className = 'svg-users-2' src={oneUser} alt="one user" />{user.following} following</p></div>
                </div>
                {(calcRepo(repo)!==0) && this.renderRepoList(repo)}
                {(calcRepo(repo)===0) && <EmptyRepo></EmptyRepo>}
            </div>
        )
    }


    renderRepo (repo, index){
        const repo_url = 'https://github.com/' + repo.owner.login + '/' + repo.name;
        this.state.counter+=1
        return (
            <div key={index} className='repo-container' >
                <div className='repo-text'>
                <div className='repo-name'><a href={repo_url} target="_blank">{repo.name}</a></div>
                <p>{repo.description}</p>
                </div>

            </div>

        )
    }


    renderRepoList(repo){
        const { currentPage, limit, offset } = this.state
        const total = repo.length
        let slice = []
        let pageCount = Math.ceil(repo.length / 4)
        if(repo.length < 4 ){
            slice = [...repo]
        }
        else {

            slice = repo.slice(offset,offset+ 4)
        }

        return(
            <div className='pagination-container col-md-8 col-lg-8 col-sm-8'>
                <span className='repo-num'>Repositories ({calcRepo(repo)}) </span>
                <span className='repo-all'>{slice.map((slice, index) => this.renderRepo(slice, index))}</span>
                <div className='pagination'>
                    <span className='pagination-text'>{offset+1}-{offset+ 4} of {total} items</span>
                <Pagination
                    total={total}
                    limit={limit}
                    pageCount={pageCount}
                    currentPage={currentPage}
                >

                    {({
                          pages,
                          currentPage,
                          hasNextPage,
                          hasPreviousPage,
                          previousPage,
                          nextPage,
                          totalPages,
                          getPageItemProps
                      }) => (
                        <div>

                            {hasPreviousPage && (
                                <button className='pagination-button'
                                    {...getPageItemProps({
                                        pageValue: previousPage,
                                        onPageChange: this.handleRepoChange
                                    })}
                                >
                                    {'<'}
                                </button>
                            )}

                            {pages.map(page => {
                                let activePage = null;
                                if (currentPage === page) {
                                    activePage = { backgroundColor: '#0064EB',
                                    color: 'white'};
                                }
                                return (
                                    <button className='pagination-button'
                                        key={page}
                                        style={activePage}
                                        {...getPageItemProps({
                                            pageValue: page,
                                            onPageChange: this.handleRepoChange
                                        })}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            {hasNextPage && (
                                <button className='arrow-pagination-button'
                                    {...getPageItemProps({
                                        pageValue: nextPage,
                                        onPageChange: this.handleRepoChange
                                    })
                                    }
                                >
                                    >
                                </button>
                            )}

                        </div>
                    )}
                </Pagination> </div>


            </div>
        )
    }

    render()
    {

        const {repo, user} = this.props
        const renderInitialState = false;
        if(!renderInitialState) return (
            <div className='--bg'>
                <div className='form-container'>
                <img className = '--svg-param --svg-param-adaptive' src={gitLogo} alt="git logo" />
                <span className = 'input-group col-md-4 col-lg-4 col-sm-4 --adaptive-form'>

                    <span className='input-group-btn'>
                     <button className='btn btn-default search-icon  rounded-right'>
                     <span className='glyphicon glyphicon-search'></span>
                     </button>
                     </span>

                    <form onSubmit={this.handleSubmit} className=''>
                        <input
                            onChange = {this.handleChange}
                            type='text'
                            className='form-control search-line '
                            placeholder="Enter GitHub username"
                        />
                    </form>

                </span>
                </div>
                <div className='col-md-12 col-lg-12 col-sm-12'>
                {!(user.length === 0) && (user !== -1) &&
                    this.renderUser(repo, user)}
                {(repo.length === 0) && (user.length === 0) && (user !== -1) &&
                <StartPage></StartPage>}
                {(user === -1) && <UserNotFoundPage></UserNotFoundPage>}
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: getUser(state),
    repo: getRepo(state)
})

const mapDispatchToProps = {
    fetchUser,
    fetchRepo,
    loadMoreRepo
}

const calcRepo = obj => {
    let res = 0
    obj.forEach((el)=>{
        res += 1
    })
    return res

}

export default connect(mapStateToProps, mapDispatchToProps) (Repo)