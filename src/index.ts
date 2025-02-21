import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { searchService } from './services/search.service';

const app = new Elysia()
    .use(swagger({
        documentation: {
            info: {
                title: 'Search API Documentation',
                version: '1.0.0',
                description: `
# Search Websites API

## Functional Requirements (RF)
This API implements a search functionality with the following key requirement:
- RF001: Enable website search functionality through a REST API endpoint
  - Priority: High
  - Status: Implemented
  - Acceptance Criteria: Returns relevant search results based on query parameters

## Non-Functional Requirements (RNF)
The system implements the following non-functional requirements:
- RNF001: Performance Monitoring
  - The system tracks and reports key performance metrics:
    * Total number of searches
    * Success rate of searches
    * Average response time
    * Search success/failure ratio
  - Target Performance:
    * Average response time < 500ms
    * Success rate > 99%

## API Usage
### Search Endpoint (/search)
- Accepts search queries via query parameter
- Returns structured results with title, URL, and description
- Implements error handling for invalid requests

### Metrics Endpoint (/metrics)
- Provides real-time performance statistics
- Monitors system health and reliability
- Tracks usage patterns and success rates

## Implementation Details
- Built with Bun + Elysia for high performance
- Implements clean code principles
- Includes comprehensive error handling
- Features automatic performance tracking

## Security Considerations
- Input validation on all parameters
- Error messages designed to avoid information leakage
- Rate limiting recommended for production use`,
                contact: {
                    name: 'API Support',
                    email: 'support@example.com'
                }
            },
            tags: [
                { name: 'Search', description: 'Search operation endpoints' },
                { name: 'Metrics', description: 'Performance monitoring endpoints' }
            ]
        }
    }))
    .get('/search', async ({ query }) => {
        const startTime = performance.now();
        if (!query?.q) {
            searchService.recordMetrics({
                timestamp: Date.now(),
                query: query?.q as string,
                success: false,
                responseTime: performance.now() - startTime
            });
            throw new Error('Search query is required');
        }
        return await searchService.search(query.q as string);
    }, {
        query: t.Optional(t.Object({
            q: t.String()
        })),
        response: {
            200: t.Array(t.Object({
                title: t.String(),
                url: t.String(),
                description: t.String()
            })),
            422: t.Object({
                error: t.String()
            }),
            500: t.Object({
                error: t.String()
            })
        },
        detail: {
            summary: 'Search websites',
            description: `
Performs a search operation across indexed websites.

Request Parameters:
- q (string, required): The search query string

Response:
- Array of search results containing:
  * title: Website title
  * url: Website URL
  * description: Brief description of the content

Error Responses:
- 422: Unprocessable Entity
- 500: Internal server error

Performance Characteristics:
- Expected response time: < 500ms
- Results are ordered by relevance`,
            tags: ['Search']
        }
    })
    .get('/metrics', () => {
        return searchService.getSearchStats();
    }, {
        detail: {
            summary: 'Get search metrics',
            description: `
Retrieves current performance metrics for the search functionality.

Response includes:
- totalSearches: Total number of search requests
- successfulSearches: Number of successful searches
- averageResponseTime: Average response time in milliseconds
- successRate: Percentage of successful searches

Used for:
- Performance monitoring
- System health checks
- Usage analytics
- SLA compliance verification`,
            tags: ['Metrics']
        }
    })
    .listen(3000);

console.log(
    `🦊 Swagger documentation is available at http://localhost:${app.server?.port}/swagger`
); 