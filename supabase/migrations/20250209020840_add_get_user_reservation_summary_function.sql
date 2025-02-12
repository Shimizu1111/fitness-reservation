-- get_customers_for_owner
CREATE OR REPLACE FUNCTION get_customers_for_owner()
RETURNS TABLE (
    id UUID,
    role user_role,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    owner_status owner_status,
    trainer_status trainer_status,
    customer_status customer_status,
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
        u.role,
        u.name, 
        u.email, 
        u.phone, 
        u.address,
        u.owner_status,
        u.trainer_status,
        u.customer_status,
        u.cancellation_reason,
        u.join_date,
        COUNT(r.id) AS reservation_count,
        MAX(r.reserved_at) AS latest_reserved_at
    FROM fitness_reservation_users u
    LEFT JOIN fitness_reservation_reservations r
    ON u.id = r.user_id
    GROUP BY u.id, u.name, u.email, u.phone, u.address, u.owner_status, u.trainer_status, u.customer_status, u.cancellation_reason, u.join_date;
END;
$$;

ALTER FUNCTION get_customers_for_owner() SET search_path = public;

-- get_lessons_for_owner
CREATE OR REPLACE FUNCTION get_lessons_for_owner()
RETURNS TABLE (
    id BIGINT,
    name TEXT,
    scheduled_start_at TIMESTAMP WITH TIME ZONE,
    scheduled_end_at TIMESTAMP WITH TIME ZONE,
    location lesson_location,
    status lesson_status,
    memo TEXT,
    max_participants SMALLINT,
    user_id UUID,
    user_name TEXT,
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
        u.id AS user_id, 
        u.name AS user_name, 
        COUNT(r.user_id) AS participants_count,
        MAX(r.reserved_at) AS latest_reserved_at
    FROM fitness_reservation_lessons l
    LEFT JOIN fitness_reservation_reservations r 
    ON l.id = r.lesson_id
    LEFT JOIN fitness_reservation_users u 
    ON l.user_id = u.id
    GROUP BY l.id, l.name, l.scheduled_start_at, l.scheduled_end_at, 
             l.location, l.status, l.memo, l.max_participants, u.id, u.name
    ORDER BY l.id DESC;
END;
$$;

ALTER FUNCTION get_lessons_for_owner() SET search_path = public;

