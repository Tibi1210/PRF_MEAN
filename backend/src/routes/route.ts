import { Router, Request, Response, NextFunction } from 'express'
import { MainClass } from '../MainClass'
import { PassportStatic } from 'passport'
import { User } from '../model/User'
import { Course } from '../model/Course'

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass()
        res.status(200).send('Hello, World!')
    })

    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass()
        res.setHeader('Content-Type', 'text/html charset=UTF-8')
        res.setHeader('Transfer-Encoding', 'chunked')

        myClass.monitoringObservable().subscribe({
            next(data: string) {
                res.write(data)
            }, error(error: string) {
                res.status(400).end(error)
            }, complete() {
                res.status(200).end()
            }
        })
    })

    
    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                res.status(500).send(error)
            } else {
                if(!user){
                    res.status(400).send("User not found")
                }else{
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send('Internal server error.')
                        } else {
                            res.status(200).send(user)
                        }
                    })
                }
            }
        })(req, res, next)
    })
    
    router.post('/register', (req: Request, res: Response) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const role = 2
        const courses: Array<string> = ["Kurzus1","Kurzus2","Kurzus3"]
        
        const user = new User({name: name, email: email, password: password, role: role, courses: courses})
        user.save().then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    })

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error)
                    res.status(500).send('Internal server error.')
                }
                res.status(200).send('Successfully logged out.')
            })
        } else {
            res.status(500).send('User is not logged in.')
        }
    })
    
    
    router.post('/newCourse', (req: Request, res: Response) => {
        const title = req.body.title
        const desc = req.body.description
        const rm = req.body.roadmap
        const lim = req.body.limit
        const stud: Array<string> = []
        const teacher = req.body.teacher
        const active = 0
        
        const course = new Course({title: title, description: desc, roadmap: rm, limit: lim, students: stud, teacher: teacher, active: active})
        course.save().then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    })
    
    router.post('/getEveryCourse', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Course.find()
            query.then(course => {
                if (course) {
                    res.status(200).send(course)
                }else{
                    res.status(500).send("Internal server error XDDDD")
                }
            }).catch(err =>{
                res.status(500).send(err)
            })
        } else {
            res.status(500).send('User is not logged in.')
        }

    })

    router.post('/getUserCourses', (req: Request, res: Response) => {
        let list: any[] = []
        const name = req.body.name
        const query = Course.find()
        query.then(course => {
            if (course) {
                course.forEach(element => {
                    if (element.students.includes(name)) {
                        list.push(element)
                    }
                });
                res.status(200).send(list)
            }else{
                res.status(500).send("Internal server error")
            }
        }).catch(err =>{
            res.status(500).send(err)
        })
    })

    router.post('/getCourseByTitle', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const title = req.body.title
            const query = Course.findOne({title: title})
            query.then(course => {
                if (course) {
                    res.status(200).send([course])
                }else{
                    res.status(200).send([])
                }
            }).catch(err =>{
                res.status(500).send(err)
            })
        } else {
            res.status(500).send('User is not logged in.')
        }
    })

    router.post('/addStudentToCourse', (req: Request, res: Response) => {
        const title = req.body.title
        let student = [req.body.student]

        const query = Course.findOne({title: title})
        query.then(course => {
            if (course) {

                course.students.forEach(element => {
                    student.push(element)
                });
                const result = Course.updateOne(
                    { title: title },
                    {
                    $set: {
                        students: student,
                    },
                    });

                result.then(course => {
                        if (course) {
                            res.status(200).send(`Courses matched: ${course.matchedCount}\n Courses updated: ${course.modifiedCount}`)
                        }else{
                            res.status(500).send("No course named UPDATE: "+title)
                        }
                    }).catch(err =>{
                        res.status(500).send(err)
                    })
                
            }else{
                res.status(500).send("No course named FIND: "+title)
            }
        }).catch(err =>{
            res.status(500).send(err);
        })
    })

    
    router.post('/removeStudentFromCourse', (req: Request, res: Response) => {
        const title = req.body.title
        let student = req.body.student
        let newArray: Array<string> = []

        const query = Course.findOne({title: title})
        query.then(course => {
            if (course) {

                course.students.forEach(element => {
                    if (!(student === element)) {
                        newArray.push(element)
                    }
                });
                const result = Course.updateOne(
                    { title: title },
                    {
                    $set: {
                        students: newArray,
                    },
                    });

                result.then(course => {
                        if (course) {
                            res.status(200).send(`Courses matched: ${course.matchedCount}\n Courses updated: ${course.modifiedCount}`)
                        }else{
                            res.status(500).send("No course named UPDATE: "+title)
                        }
                    }).catch(err =>{
                        res.status(500).send(err)
                    })
                
            }else{
                res.status(500).send("No course named FIND: "+title)
            }
        }).catch(err =>{
            res.status(500).send(err);
        })
    })
    
    return router
}