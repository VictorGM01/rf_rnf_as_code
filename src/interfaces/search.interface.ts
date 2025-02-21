export interface SearchResult {
    title: string;
    url: string;
    description: string;
}

export interface SearchMetrics {
    timestamp: number;
    query: string;
    success: boolean;
    responseTime: number;
}

export interface SearchStats {
    totalSearches: number;
    successfulSearches: number;
    averageResponseTime: number;
    successRate: number;
} 