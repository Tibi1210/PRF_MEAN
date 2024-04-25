import { Router, Request, Response, NextFunction } from 'express'
import { MainClass } from '../MainClass'
import { PassportStatic } from 'passport'
import { User } from '../model/User'


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
        const email = req.body.email
        const password = req.body.password
        const user = new User({email: email, password: password})
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

    return router
}