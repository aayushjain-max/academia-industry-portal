from rest_framework.exceptions import APIException

class BusinessLogicError(APIException):
    status_code = 400
    default_detail = 'A business rule violation occurred.'
    default_code = 'business_rule_violation'
