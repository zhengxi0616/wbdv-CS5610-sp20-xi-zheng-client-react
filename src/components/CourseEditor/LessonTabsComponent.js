import React from "react";
export default class LessonTabsComponent extends React.Component {

    componentDidMount() {
        this.props.findLessonsForModule(this.props.moduleId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.moduleId !== prevProps.moduleId) {
            this.props.findLessonsForModule(this.props.moduleId)
        }
    }

    state = {
        selectedLessonId: this.props.lessonId,
        editingLessonId: '',
        lesson: {
            title: '',
            _id: ''
        },
        NewLessonTile:'New Module'
    }

    render() {
        return(
            <ul className="nav nav-tabs">
                {
                    this.props.lessons && this.props.lessons.map(lesson =>
                        <li className={`nav-item ${lesson._id === this.state.selectedLessonId ? 'active':''}`}
                        onClick={() => {
                            const lessonId = lesson._id
                            this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${lessonId}`)
                            this.setState({
                                selectedLessonId: lesson._id
                            })}}
                            key={lesson._id}>
                            <a className={`nav-link
                                            ${(this.state.editingLessonId === lesson._id || this.state.selectedLessonId === lesson._id)?'active':''}`}>
                                {this.state.editingLessonId !== lesson._id &&
                                <span>
                                    {lesson.title}
                                    <text>&nbsp;</text>
                                    <text>&nbsp;</text>
                                    <button className={"btn-sm"} onClick={() => {
                                        const lessonId = lesson._id
                                        this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${lessonId}`)
                                        this.setState({
                                            editingLessonId: lesson._id
                                        })
                                    }}>
                                    <i className="fas fa-edit"></i>
                                    </button>
                                </span>}
                                {this.state.editingLessonId === lesson._id &&
                                <span>

                                <input
                                    onChange={(e) => {
                                        const newTitle = e.target.value
                                        this.setState(prevState => ({
                                            lesson: {
                                                ...prevState.lesson,
                                                title: newTitle
                                            }
                                        }))
                                    }}
                                    value={this.state.lesson.title}/>
                                <div className={"float-right"}>
                                    <button className={"btn-sm"} onClick={() => this.props.updateLesson(lesson._id, {title: this.state.lesson.title})
                                    .then(() => this.setState({editingLessonId: ''}))
                                        .then(() => this.props.findLessonsForModule(this.props.moduleId))}>
                                        <i className="fas fa-save"></i>
                                    </button>
                                    <button className={"btn-sm"} onClick={() =>this.props.deleteLesson(lesson._id)}>
                                        <i className="far fa-window-close"></i>
                                    </button>
                                </div>
                                </span>}

                            </a>
                        </li>)
                }
                <li className="nav-item col-1">
                    <button onClick={() => this.props.createLesson(this.props.moduleId, {title: "New Lesson"})}>
                        <i className="fas fa-plus"></i>
                    </button>
                </li>
            </ul>
        )
    }
}

