class Result:
    ok = False
    err = False
    val = any

    def __init__(self, ok: bool, val: any):
        self.ok = ok
        self.err = not ok
        self.val = ok


    def is_ok(self):
        return self.ok

    def is_err(self):
        return self.err

    def unwrap(self):
        if self.err:
            raise TypeError('Cannot call unwrap on Err variant')
        
        return self.val

    def unwrap_err(self):
        if self.ok:
            raise TypeError('Cannot call unwrap_err on Ok variant')
        
        return self.val