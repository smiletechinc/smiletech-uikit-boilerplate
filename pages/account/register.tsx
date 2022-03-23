import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import  Link from 'next/link';
// import { alertService } from '../../utils/alertDisplay';


const Register = () => {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit= async (user: any) => {
            //    alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('login');
            }

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <Link href="/account/login">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;