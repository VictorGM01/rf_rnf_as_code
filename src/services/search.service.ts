import type { SearchResult, SearchMetrics, SearchStats } from '../interfaces/search.interface';

class SearchService {
    private searchMetrics: SearchMetrics[] = [];
    private mockResults: SearchResult[] = [
        {
            title: "Example Website 1",
            url: "https://example1.com",
            description: "This is an example search result"
        },
        {
            title: "Example Website 2",
            url: "https://example2.com",
            description: "Another example search result"
        }
    ];

    async search(query: string): Promise<SearchResult[]> {
        const startTime = performance.now();
        let success = true;
        
        try {
            // Simulate search delay
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Simple mock search implementation
            const results = this.mockResults.filter(result => 
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.description.toLowerCase().includes(query.toLowerCase())
            );
            
            return results;
        } catch (error) {
            success = false;
            throw error;
        } finally {
            const endTime = performance.now();
            this.recordMetrics({
                timestamp: Date.now(),
                query,
                success,
                responseTime: endTime - startTime
            });
        }
    }

    recordMetrics(metrics: SearchMetrics): void {
        this.searchMetrics.push(metrics);
    }

    getSearchStats(): SearchStats {
        const totalSearches = this.searchMetrics.length;
        const successfulSearches = this.searchMetrics.filter(m => m.success).length;
        const totalResponseTime = this.searchMetrics.reduce((sum, m) => sum + m.responseTime, 0);
        
        return {
            totalSearches,
            successfulSearches,
            averageResponseTime: totalSearches > 0 ? totalResponseTime / totalSearches : 0,
            successRate: totalSearches > 0 ? (successfulSearches / totalSearches) * 100 : 0
        };
    }
}

export const searchService = new SearchService(); 