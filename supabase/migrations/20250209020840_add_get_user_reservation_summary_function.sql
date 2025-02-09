CREATE OR REPLACE FUNCTION get_user_reservation_summary()
RETURNS TABLE (
    id UUID,
    name TEXT,
    email TEXT,
    phone TEXT,
    status SMALLINT,
    reservation_count BIGINT,
    latest_reserved_at TIMESTAMP WITH TIME ZONE,
    join_date TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.phone, 
        u.status,
        COUNT(r.id) AS reservation_count,
        MAX(r.reserved_at) AS latest_reserved_at,
        u.join_date
    FROM fitness_reservation_users u
    LEFT JOIN fitness_reservation_reservations r
    ON u.id = r.user_id
    GROUP BY u.id, u.name, u.email, u.phone, u.status;
END;
$$;
