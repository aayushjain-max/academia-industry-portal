from app.services.opportunity_matching.service import OpportunityMatchingService
from app.schemas.requests import OpportunityMatchRequest
from app.schemas.responses import MatchResponse

class MatchingPipeline:
    def run(self, payload: OpportunityMatchRequest) -> MatchResponse:
        return OpportunityMatchingService.match(payload)
