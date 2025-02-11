-- get_customers_for_owner
CREATE OR REPLACE FUNCTION get_customers_for_owner()
RETURNS TABLE (
    id UUID,
    role_id SMALLINT,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    status SMALLINT,
    cancellation_reason TEXT,
    join_date TIMESTAMP WITH TIME ZONE,
    reservation_count BIGINT,
    latest_reserved_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id, 
        u.role_id,
        u.name, 
        u.email, 
        u.phone, 
        u.address,
        u.status,
        u.cancellation_reason,
        u.join_date,
        COUNT(r.id) AS reservation_count,
        MAX(r.reserved_at) AS latest_reserved_at
    FROM fitness_reservation_users u
    LEFT JOIN fitness_reservation_reservations r
    ON u.id = r.user_id
    GROUP BY u.id, u.name, u.email, u.phone, u.status;
END;
$$;

ALTER FUNCTION get_customers_for_owner() SET search_path = public;

-- get_lessons_for_owner
CREATE OR REPLACE FUNCTION get_lessons_for_owner()
RETURNS TABLE (
    id UUID,
    name TEXT,
    scheduled_start_at TIMESTAMP WITH TIME ZONE,
    scheduled_end_at TIMESTAMP WITH TIME ZONE,
    location SMALLINT,
    status SMALLINT,
    memo TEXT,
    max_participants SMALLINT,
    participants_count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.id, 
        l.name, 
        l.scheduled_start_at, 
        l.scheduled_end_at, 
        l.location, 
        l.status, 
        l.memo, 
        l.max_participants,
        COUNT(r.user_id) AS participants_count
    FROM fitness_reservation_lessons l
    LEFT JOIN fitness_reservation_reservations r 
    ON l.id = r.lesson_id
    GROUP BY l.id, l.name, l.scheduled_start_at, l.scheduled_end_at, l.location, l.status, l.memo, l.max_participants
    ORDER BY l.id DESC;
END;
$$;

ALTER FUNCTION get_lessons_for_owner() SET search_path = public;

