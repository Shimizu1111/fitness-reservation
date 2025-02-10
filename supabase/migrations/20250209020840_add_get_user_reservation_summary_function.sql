CREATE OR REPLACE FUNCTION get_user_reservation_summary()
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

-- 関数の検索パスをpublicに設定
ALTER FUNCTION get_user_reservation_summary() SET search_path = public;
