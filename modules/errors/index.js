'use strict'

class Errors {
    static errorDetail(code, name) {
        switch (code) {
            case 1:
                return { name: name, code: 'required', message: `${ name } cannot be blank.` }
            case 2:
                return { name: name, code: 'not_valid', message: `${ name } not validation.` }
            default:
                return { name: name, code: null, message: null }
        }
    }

    static error400(params) {
        return {
            error: {
                params: params || [],
                type: 'invalid_param_error',
                message: 'Invalid data parameters.'
            }
        }
    }

    static error404(path) {
        return {
            error: {
                type: 'invalid_request_error',
                message: `Unable to resolve the request "${ path }".`
            }
        }
    }

    static error500() {
        return {
            error: {
                type: 'internal_server_error',
                message: 'Unable to resolve the request.'
            }
        }
    }
}

module.exports = Errors