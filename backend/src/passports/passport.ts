import { PassportStatic } from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../model/User'

export const configurePassport = (passport: PassportStatic): PassportStatic => {

    passport.serializeUser((user: Express.User, done) => {
        console.log('user is serialized.')
        done(null, user)
    })

    passport.deserializeUser((user: Express.User, done) => {
        console.log('user is deserialized.')
        done(null, user)
    })

    passport.use('local', new Strategy((username, password, done) => {
        
        const query = User.findOne({email: username})
        query.then(user => {
            if (user) {
                user.comparePwd(password, (error, isMatch) => {
                    if (error || !isMatch) {
                        done('Incorrect password.');
                    } else {
                        done(null, user);
                    }
                });
            }else{
                done(null, undefined)
            }
        }).catch(err =>{
            done(err)
        })
  
    }))

    return passport
}